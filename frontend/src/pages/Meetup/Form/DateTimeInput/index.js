import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { setHours, setMinutes } from 'date-fns';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

export default function DatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="Hora"
        dateFormat="dd/MM/yyyy HH:mm"
        locale="pt-BR"
        minDate={new Date()}
        name={fieldName}
        selected={selected}
        placeholderText="Data do Meetup"
        onChange={date => setSelected(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
