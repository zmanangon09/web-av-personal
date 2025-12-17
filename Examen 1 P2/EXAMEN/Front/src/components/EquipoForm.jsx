import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const EquipoForm = ({ visible, onHide, onSave, equipo }) => {
    const emptyEquipo = {
        nombre: ''
    };

    const [formData, setFormData] = useState(emptyEquipo);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (equipo) {
            setFormData(equipo);
        } else {
            setFormData(emptyEquipo);
        }
    }, [equipo]);

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _formData = { ...formData };
        _formData[name] = val;
        setFormData(_formData);
    };

    const saveEquipo = () => {
        setSubmitted(true);

        if (formData.nombre.trim()) {
            onSave(formData);
            setFormData(emptyEquipo);
            setSubmitted(false);
            onHide();
        }
    };

    const footer = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-check" onClick={saveEquipo} autoFocus />
        </div>
    );

    return (
        <Dialog visible={visible} style={{ width: '450px' }} header={equipo ? "Editar Equipo" : "Nuevo Equipo"} modal className="p-fluid" footer={footer} onHide={onHide}>
            <div className="field">
                <label htmlFor="nombre">Nombre</label>
                <InputText id="nombre" value={formData.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !formData.nombre })} />
                {submitted && !formData.nombre && <small className="p-error">El nombre es obligatorio.</small>}
            </div>
        </Dialog>
    );
};

export default EquipoForm;
