type Props = React.ComponentProps<"input"> & {
  label: string;
  placeholderText: string;
  type: string;
};

export function Input({ label, placeholderText, type }: Props) {
  return (
    <fieldset>
      <label>{label}</label>
      <input type={type} placeholder={placeholderText} />
    </fieldset>
  );
}
