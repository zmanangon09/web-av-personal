'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { EquipoForm } from '../../components/EquipoForm';
import { EquipoTable } from '../../components/EquipoTable';
import { equipoService } from '../../../../demo/service/equipoService';
import { Equipo } from '../../../../types/equipo';

const EquiposPage = () => {
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [equipoDialog, setEquipoDialog] = useState(false);
    const [equipo, setEquipo] = useState<Equipo | null>(null);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        loadEquipos();
    }, []);

    const loadEquipos = async () => {
        try {
            setLoading(true);
            const data = await equipoService.getEquipos();
            setEquipos(data);
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'Error al cargar equipos',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const openNew = () => {
        setEquipo({ nombre: '' });
        setEquipoDialog(true);
    };

    const hideDialog = () => {
        setEquipoDialog(false);
        setEquipo(null);
    };

    const saveEquipo = async (equipoData: Equipo) => {
        try {
            if (equipoData.id) {
                await equipoService.updateEquipo(equipoData.id, equipoData);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Equipo actualizado correctamente',
                    life: 3000
                });
            } else {
                await equipoService.createEquipo(equipoData);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Equipo creado correctamente',
                    life: 3000
                });
            }
            hideDialog();
            loadEquipos();
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'Error al guardar equipo',
                life: 3000
            });
        }
    };

    const editEquipo = (equipoData: Equipo) => {
        setEquipo({ ...equipoData });
        setEquipoDialog(true);
    };

    const confirmDeleteEquipo = (equipoData: Equipo) => {
        confirmDialog({
            message: `¿Está seguro de eliminar el equipo "${equipoData.nombre}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => deleteEquipo(equipoData)
        });
    };

    const deleteEquipo = async (equipoData: Equipo) => {
        try {
            if (equipoData.id) {
                await equipoService.deleteEquipo(equipoData.id);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Equipo eliminado correctamente',
                    life: 3000
                });
                loadEquipos();
            }
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'Error al eliminar equipo',
                life: 3000
            });
        }
    };

    const onInputChange = (field: string, value: any) => {
        setEquipo((prev) => ({ ...prev!, [field]: value }));
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button
                    label="Nuevo Equipo"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={openNew}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                label="Actualizar"
                icon="pi pi-refresh"
                className="p-button-help"
                onClick={loadEquipos}
            />
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmDialog />
                    
                    <h5>Gestión de Equipos</h5>
                    
                    <Toolbar 
                        className="mb-4" 
                        left={leftToolbarTemplate} 
                        right={rightToolbarTemplate}
                    />

                    <EquipoTable
                        equipos={equipos}
                        onEdit={editEquipo}
                        onDelete={confirmDeleteEquipo}
                        loading={loading}
                    />

                    <EquipoForm
                        visible={equipoDialog}
                        equipo={equipo}
                        onHide={hideDialog}
                        onSave={saveEquipo}
                        onChange={onInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default EquiposPage;
