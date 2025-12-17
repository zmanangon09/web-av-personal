import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import EquipoTable from '../components/EquipoTable';
import EquipoForm from '../components/EquipoForm';
import { getEquipos, createEquipo, updateEquipo, deleteEquipo } from '../services/equipoService';

const EquiposPage = () => {
    const [equipos, setEquipos] = useState([]);
    const [equipoDialog, setEquipoDialog] = useState(false);
    const [selectedEquipo, setSelectedEquipo] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        loadEquipos();
    }, []);

    const loadEquipos = async () => {
        try {
            const res = await getEquipos();
            setEquipos(res.data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los equipos' });
        }
    };

    const openNew = () => {
        setSelectedEquipo(null);
        setEquipoDialog(true);
    };

    const hideDialog = () => {
        setEquipoDialog(false);
    };

    const handleSave = async (equipo) => {
        try {
            if (equipo.id) {
                await updateEquipo(equipo.id, equipo);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Equipo actualizado' });
            } else {
                await createEquipo(equipo);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Equipo creado' });
            }
            loadEquipos();
            setEquipoDialog(false);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el equipo' });
        }
    };

    const handleEdit = (equipo) => {
        setSelectedEquipo({ ...equipo });
        setEquipoDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este equipo?")) {
            try {
                await deleteEquipo(id);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Equipo eliminado' });
                loadEquipos();
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el equipo' });
            }
        }
    };

    const leftToolbarTemplate = () => {
        return (
            <Button label="Nuevo Equipo" icon="pi pi-plus" severity="success" onClick={openNew} />
        );
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <EquipoTable equipos={equipos} onEdit={handleEdit} onDelete={handleDelete} />
            <EquipoForm visible={equipoDialog} onHide={hideDialog} onSave={handleSave} equipo={selectedEquipo} />
        </div>
    );
};

export default EquiposPage;
