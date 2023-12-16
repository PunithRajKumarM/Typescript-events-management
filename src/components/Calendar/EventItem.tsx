import React, { useEffect, useRef, useState } from 'react';
import {
  UserEvent,
  deleteUserEvent,
  updateUserEvent,
} from '../../redux/user-events';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/store';
import { Action } from 'redux';
import { addZero } from '../../lib/util';

interface Props {
  event: UserEvent;
}
const EventItem: React.FC<Props> = ({ event }) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);
  const handleTitleClick = () => {
    setEditable(true);
  };

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    if (title !== event.title) {
      dispatchThunk(
        updateUserEvent({
          ...event,
          title,
        })
      );
    }
    setEditable(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatchThunk = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    Action
  >;
  //   const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatchThunk(deleteUserEvent(event.id));
  };

  function handleDisplayTimer(data: string | number) {
    let hours = new Date(data).getHours();
    let minutes = new Date(data).getMinutes();
    let seconds = new Date(data).getSeconds();
    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
  }
  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">{`${handleDisplayTimer(
          event.dateStart
        )} - ${handleDisplayTimer(event.dateEnd)}`}</div>
        <div className="calendar-event-title">
          {editable ? (
            <input
              type="text"
              ref={inputRef}
              value={title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <span onClick={handleTitleClick}>{event.title}</span>
          )}
        </div>
      </div>
      <button
        className="calendar-event-delete-button"
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
