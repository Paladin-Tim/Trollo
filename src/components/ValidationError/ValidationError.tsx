interface ErrorProps {
  errorText: string;
}

export const ValidationError = ({ errorText }: ErrorProps) => {
  return (
    <div className="errorWrapper">
      <span className="errorText">{`Validation error: ${errorText}`}</span>
    </div>
  );
};
