import React from 'react';

const InputField = ({
	value,
	label,
	name,
	placeholder,
	type,
	onChange,
	ref,
}) => {
	return (
		<input
			type={type}
			value={value}
			name={name}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};

export default InputField;
