import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './Button.module.scss';
import AngleLeft from '../../img/angle-left.inline.svg';
import { cleanPath } from '../../utils/paths';

export const Button = ({ className, text, path }) => {
  return (
    <Link
      to={cleanPath(path)}
      className={classNames('button', styles.button, className)}
    >
      <span>{text}</span>
      <span className="icon is-small">
        <ArrowRight />
      </span>
    </Link>
  );
};

export const ButtonBack = ({ className, text, path }) => {
  return (
    <Link
      to={cleanPath(path)}
      className={classNames('button', styles.button, className)}
    >
      <span className="icon is-small">
        <AngleLeft />
      </span>
      <span>{text}</span>
    </Link>
  );
};

const ArrowRight = () => (
  <svg
    width="15"
    height="12"
    viewBox="0 0 15 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5303 6.53033C14.8232 6.23744 14.8232 5.76256 14.5303 5.46967L9.75736 0.6967C9.46447 0.403807 8.98959 0.403807 8.6967 0.6967C8.40381 0.989593 8.40381 1.46447 8.6967 1.75736L12.9393 6L8.6967 10.2426C8.40381 10.5355 8.40381 11.0104 8.6967 11.3033C8.98959 11.5962 9.46447 11.5962 9.75736 11.3033L14.5303 6.53033ZM-6.55671e-08 6.75L14 6.75L14 5.25L6.55671e-08 5.25L-6.55671e-08 6.75Z"
      fill="white"
    />
  </svg>
);

export default Button;
