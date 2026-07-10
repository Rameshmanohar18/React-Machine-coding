const VARIANT = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
};

const Button = ({
  text = '',
  onClickHandler = () => {},
  isLoading = false,
  isDisabled = false,
  variant = VARIANT.PRIMARY,
}) => {
  return (
    <button
      className={`button ${variant}`}
      disabled={isDisabled || isLoading}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};

export default Button;