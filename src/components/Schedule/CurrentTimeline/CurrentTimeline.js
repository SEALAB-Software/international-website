import React, { useEffect, useState } from 'react';
import styles from './CurrentTimeline.module.scss';
import { getDigitalTime } from '../../../utils/date';
import EventText from '../TimelineText';
import { idMaker } from '../../../utils/id-maker';

const gen = idMaker();

const CurrentTimeline = ({ heading, event }) => {
  const [eventProgress, setEventProgress] = useState(0);

  const generateTimeline = () => {
    const timeList = [];
    const targetLength = 4;
    if (!event) return undefined;
    const { start_time: startTime, stop_time: endTime } = event;

    const start = new Date(Date.parse(startTime));
    const stop = new Date(Date.parse(endTime));
    const duration = stop.getTime() - start.getTime();
    const timeStep = duration / (targetLength - 1);

    let i = 1;
    timeList.push(start);
    while (timeList.length < targetLength - 1) {
      timeList.push(new Date(start.getTime() + i * timeStep));
      i += 1;
    }
    timeList.push(stop);

    const strTimeList = timeList.map(dateObj => {
      return getDigitalTime(dateObj.toISOString());
    });
    return strTimeList;
  };
  useEffect(() => {
    let ignore = false;
    if (!event || ignore) return undefined;
    const { start_time: startTime, stop_time: endTime } = event;
    const intervalId = setTimeout(() => {
      const calculateProgress = () => {
        const start = new Date(Date.parse(startTime)).getTime();
        const stop = new Date(Date.parse(endTime)).getTime();
        const duration = stop - start;
        const elapsed = new Date().getTime() - start;
        const progress = Math.min(elapsed / duration, 1.0);
        setEventProgress(progress);
      };
      calculateProgress();
    }, 1000);
    return () => {
      clearTimeout(intervalId);
      ignore = true;
    };
  }, [event, eventProgress]);

  if (!heading || !event) return <></>;
  const {
    friendlyTitleName_en: friendlyTitleName,
    friendlyCameraName_en: friendlyCameraName,
    start_time: startTime,
    stop_time: endTime,
  } = event;
  const friendlyStartTime = getDigitalTime(startTime);
  const friendlyEndTime = getDigitalTime(endTime);

  return (
    <div className={styles.currentTimeline}>
      {heading}
      <TimeLine times={generateTimeline()} />
      <div className={styles.progress}>
        <div
          style={{ width: `${eventProgress * 100}%` }}
          className={styles.progress__bar}
        />
        <EventText
          startTime={friendlyStartTime}
          endTime={friendlyEndTime}
          heading={friendlyTitleName}
          camName={friendlyCameraName}
          isActive
        />
      </div>
    </div>
  );
};

export const TimeLine = ({ times }) => {
  if (!times && typeof times[0] !== 'string') return <></>;
  return (
    <div
      className={styles.timeline}
      style={{ gridTemplateColumns: `repeat(${times.length}, [col] 1fr)` }}
    >
      {times.map(time => (
        <div key={gen.next().value} className={styles.timeline__time}>
          <p>{time}</p>
        </div>
      ))}
    </div>
  );
};

export default CurrentTimeline;
