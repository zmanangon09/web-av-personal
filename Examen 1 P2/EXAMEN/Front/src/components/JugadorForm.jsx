import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';

const JugadorForm = ({ visible, onHide, onSave, jugador, equipos }) => {
    const emptyJugador = {
        nombre: '',
        id_equipo: null
    };

    const [formData, setFormData] = useState(emptyJugador);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (jugador) {
            setFormData(jugador);
        } else {
            setFormData(emptyJugador);
        }
    }, [jugador]);

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _formData = { ...formData };
        _formData[name] = val;
        setFormData(_formData);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _formData = { ...formData };
        _formData[name] = val;
        setFormData(_formData);
    };

    const saveJugador = () => {
        setSubmitted(true);

        if (formData.nombre.trim() && formData.id_equipo) {
            onSave(formData);
            setFormData(emptyJugador);
            setSubmitted(false);
            onHide();
        }
    };

    const footer = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-check" onClick={saveJugador} autoFocus />
        </div>
    );

    return (
        <Dialog visible={visible} style={{ width: '450px' }} header={jugador ? "Editar Jugador" : "Nuevo Jugador"} modal className="p-fluid" footer={footer} onHide={onHide}>
            <div className="field">
                <label htmlFor="nombre">Nombre</label>
                <InputText id="nombre" value={formData.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !formData.nombre })} />
                {submitted && !formData.nombre && <small className="p-error">El nombre es obligatorio.</small>}
            </div>

            <div className="field">
                <label htmlFor="id_equipo">Equipo</label>
                <Dropdown id="id_equipo" value={formData.id_equipo} onChange={(e) => onInputChange(e, 'id_equipo')} options={equipos} optionLabel="nombre" optionValue="id" placeholder="Seleccione un equipo" className={classNames({ 'p-invalid': submitted && !formData.id_equipo })} />
                {submitted && !formData.id_equipo && <small className="p-error">El equipo es obligatorio.</small>}
            </div>
        </Dialog>
    );
};

export default JugadorForm;
