import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import JugadorTable from '../components/JugadorTable';
import JugadorForm from '../components/JugadorForm';
import { getJugadores, createJugador, updateJugador, deleteJugador } from '../services/jugadorService';
import { getEquipos } from '../services/equipoService';

const JugadoresPage = () => {
    const [jugadores, setJugadores] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [jugadorDialog, setJugadorDialog] = useState(false);
    const [selectedJugador, setSelectedJugador] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        loadJugadores();
        loadEquipos();
    }, []);

    const loadJugadores = async () => {
        try {
            const res = await getJugadores();
            setJugadores(res.data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los jugadores' });
        }
    };

    const loadEquipos = async () => {
        try {
            const res = await getEquipos();
            setEquipos(res.data);
        } catch (error) {
            console.error("Error loading teams", error);
        }
    };

    const openNew = () => {
        setSelectedJugador(null);
        setJugadorDialog(true);
    };

    const hideDialog = () => {
        setJugadorDialog(false);
    };

    const handleSave = async (jugador) => {
        try {
            if (jugador.id) {
                await updateJugador(jugador.id, jugador);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Jugador actualizado' });
            } else {
                await createJugador(jugador);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Jugador creado' });
            }
            loadJugadores();
            setJugadorDialog(false);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el jugador' });
        }
    };

    const handleEdit = (jugador) => {
        setSelectedJugador({ ...jugador });
        setJugadorDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este jugador?")) {
            try {
                await deleteJugador(id);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Jugador eliminado' });
                loadJugadores();
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el jugador' });
            }
        }
    };

    const leftToolbarTemplate = () => {
        return (
            <Button label="Nuevo Jugador" icon="pi pi-plus" severity="success" onClick={openNew} />
        );
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <JugadorTable jugadores={jugadores} onEdit={handleEdit} onDelete={handleDelete} />
            <JugadorForm visible={jugadorDialog} onHide={hideDialog} onSave={handleSave} jugador={selectedJugador} equipos={equipos} />
        </div>
    );
};

export default JugadoresPage;
