'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dropdown } from 'primereact/dropdown';
import { JugadorForm } from '../../components/JugadorForm';
import { JugadorTable } from '../../components/JugadorTable';
import { jugadorService } from '../../../../demo/service/jugadorService';
import { equipoService } from '../../../../demo/service/equipoService';
import { Jugador, Equipo } from '../../../../types/equipo';

const JugadoresPage = () => {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [jugadorDialog, setJugadorDialog] = useState(false);
    const [jugador, setJugador] = useState<Jugador | null>(null);
    const [loading, setLoading] = useState(false);
    const [filtroEquipo, setFiltroEquipo] = useState<number | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [jugadoresData, equiposData] = await Promise.all([
                jugadorService.getJugadores(),
                equipoService.getEquipos()
            ]);
            setJugadores(jugadoresData);
            setEquipos(equiposData);
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'Error al cargar datos',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const openNew = () => {
        setJugador({ nombre: '', id_equipo: 0 });
        setJugadorDialog(true);
    };

    const hideDialog = () => {
        setJugadorDialog(false);
        setJugador(null);
    };

    const saveJugador = async (jugadorData: Jugador) => {
        try {
            if (jugadorData.id) {
                await jugadorService.updateJugador(jugadorData.id, jugadorData);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Jugador actualizado correctamente',
                    life: 3000
                });
            } else {
                await jugadorService.createJugador(jugadorData);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Jugador creado correctamente',
                    life: 3000
                });
            }
            hideDialog();
            loadData();
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'Error al guardar jugador',
                life: 3000
            });
        }
    };

    const editJugador = (jugadorData: Jugador) => {
        setJugador({ ...jugadorData });
        setJugadorDialog(true);
    };

    const confirmDeleteJugador = (jugadorData: Jugador) => {
        confirmDialog({
            message: `¿Está seguro de eliminar al jugador "${jugadorData.nombre}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => deleteJugador(jugadorData)
        });
    };

    const deleteJugador = async (jugadorData: Jugador) => {
        try {
            if (jugadorData.id) {
                await jugadorService.deleteJugador(jugadorData.id);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Jugador eliminado correctamente',
                    life: 3000
                });
                loadData();
            }
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'Error al eliminar jugador',
                life: 3000
            });
        }
    };

    const onInputChange = (field: string, value: any) => {
        setJugador((prev) => ({ ...prev!, [field]: value }));
    };

    const filtrarJugadores = () => {
        if (!filtroEquipo) return jugadores;
        return jugadores.filter(j => j.id_equipo === filtroEquipo);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button
                    label="Nuevo Jugador"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={openNew}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center">
                <label htmlFor="filtro-equipo" className="mr-2">Filtrar por equipo:</label>
                <Dropdown
                    id="filtro-equipo"
                    value={filtroEquipo}
                    options={[{ id: null, nombre: 'Todos' }, ...equipos]}
                    onChange={(e) => setFiltroEquipo(e.value)}
                    optionLabel="nombre"
                    optionValue="id"
                    placeholder="Todos los equipos"
                    className="mr-2"
                    style={{ width: '200px' }}
                />
                <Button
                    label="Actualizar"
                    icon="pi pi-refresh"
                    className="p-button-help"
                    onClick={loadData}
                />
            </div>
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmDialog />
                    
                    <h5>Gestión de Jugadores</h5>
                    
                    <Toolbar 
                        className="mb-4" 
                        left={leftToolbarTemplate} 
                        right={rightToolbarTemplate}
                    />

                    <JugadorTable
                        jugadores={filtrarJugadores()}
                        onEdit={editJugador}
                        onDelete={confirmDeleteJugador}
                        loading={loading}
                    />

                    <JugadorForm
                        visible={jugadorDialog}
                        jugador={jugador}
                        equipos={equipos}
                        onHide={hideDialog}
                        onSave={saveJugador}
                        onChange={onInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default JugadoresPage;
