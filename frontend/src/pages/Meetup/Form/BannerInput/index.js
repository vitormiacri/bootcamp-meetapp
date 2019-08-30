/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { MdCameraAlt } from 'react-icons/md';

import api from '~/services/api';
import { Container, BannerDefault } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('banner');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Meetup Banner" />
        ) : (
          <BannerDefault>
            <MdCameraAlt size={64} color="#999" />
            <strong>Selecionar Imagem</strong>
          </BannerDefault>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
