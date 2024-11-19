import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonText, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Head from '../components/HeadIcon';
import Navbar from '../components/Navegationbar';
import './EditarCuenta.css';

interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    region: string;
    comuna: string;
}

const EditarCuenta: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nombre: '',
        correo: '',
        region: '',
        comuna: ''
    });
    const [contrasenas, setContrasenas] = useState({
        actual: '',
        nueva: '',
        confirmar: ''
    });
    const [mostrarContrasena, setMostrarContrasena] = useState({
        actual: false,
        nueva: false,
        confirmar: false
    });
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [seccionActiva, setSeccionActiva] = useState<'datos' | 'contrasena'>('datos');
    const history = useHistory();

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const usuarioData = JSON.parse(usuarioGuardado);
            setUsuario({
                id: usuarioData.id,
                nombre: usuarioData.nombre,
                correo: usuarioData.correo,
                region: usuarioData.region,
                comuna: usuarioData.comuna
            });
        } else {
            history.push('/iniciosesion');
        }
    }, [history]);

    const handleActualizarDatos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                history.push('/iniciosesion');
                return;
            }

            const response = await fetch(`http://localhost:3000/api/usuario/${usuario.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('usuario', JSON.stringify({ ...usuario }));
                setMensaje('Datos actualizados exitosamente');
                setTimeout(() => setMensaje(''), 3000);
            } else {
                setError(data.message);
                setTimeout(() => setError(''), 3000);
            }
        } catch (error) {
            setError('Error al actualizar los datos');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleCambiarContrasena = async () => {
        if (contrasenas.nueva !== contrasenas.confirmar) {
            setError('Las contraseñas nuevas no coinciden');
            return;
        }

        if (contrasenas.nueva.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                history.push('/iniciosesion');
                return;
            }

            const response = await fetch(
                `http://localhost:3000/api/usuario/cambiar-contrasena/${usuario.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contrasenaActual: contrasenas.actual,
                        nuevaContrasena: contrasenas.nueva
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMensaje('Contraseña actualizada exitosamente');
                setContrasenas({ actual: '', nueva: '', confirmar: '' });
                setTimeout(() => setMensaje(''), 3000);
            } else {
                setError(data.message);
                setTimeout(() => setError(''), 3000);
            }
        } catch (error) {
            setError('Error al cambiar la contraseña');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <IonPage>
            <Head />
            <IonContent>
                <div className="editar-cuenta-container">
                    <div className="editar-cuenta-card">

                        {error && (
                            <div className="mensaje-error">
                                <IonText>{error}</IonText>
                            </div>
                        )}

                        {mensaje && (
                            <div className="mensaje-exito">
                                <IonText>{mensaje}</IonText>
                            </div>
                        )}

                        <div className="seccion-botones" style={{ marginBottom:'10px',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IonButton style={{ width: '48%' }}
                                fill={seccionActiva === 'datos' ? 'solid' : 'outline'}
                                onClick={() => setSeccionActiva('datos')}> Datos personales
                            </IonButton>
                            <IonButton style={{ width: '48%' }}
                                fill={seccionActiva === 'contrasena' ? 'solid' : 'outline'}
                                onClick={() => setSeccionActiva('contrasena')}
                            > Cambiar contraseña</IonButton>
                        </div>


                        {seccionActiva === 'datos' && (
                            <form onSubmit={(e) => { e.preventDefault(); handleActualizarDatos(); }}>
                                <IonItem>
                                    <IonLabel position="stacked">Nombre</IonLabel>
                                    <IonInput
                                        value={usuario.nombre}
                                        onIonChange={e => setUsuario({ ...usuario, nombre: e.detail.value! })}
                                        required
                                    />
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="stacked">Correo</IonLabel>
                                    <IonInput
                                        type="email"
                                        value={usuario.correo}
                                        onIonChange={e => setUsuario({ ...usuario, correo: e.detail.value! })}
                                        required
                                    />
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="stacked">Región</IonLabel>
                                    <IonSelect
                                        value={usuario.region}
                                        onIonChange={e => setUsuario({ ...usuario, region: e.detail.value })}
                                    >
                                        <IonSelectOption value="Arica y Parinacota">Arica y Parinacota</IonSelectOption>
                                        <IonSelectOption value="Tarapacá">Tarapacá</IonSelectOption>
                                        <IonSelectOption value="Antofagasta">Antofagasta</IonSelectOption>
                                        <IonSelectOption value="Atacama">Atacama</IonSelectOption>
                                        <IonSelectOption value="Coquimbo">Coquimbo</IonSelectOption>
                                        <IonSelectOption value="O'Higgins">O'Higgins</IonSelectOption>
                                        <IonSelectOption value="Maule">Maule</IonSelectOption>
                                        <IonSelectOption value="Ñuble">Ñuble</IonSelectOption>
                                        <IonSelectOption value="La Araucanía">La Araucanía</IonSelectOption>
                                        <IonSelectOption value="Los Ríos">Los Ríos</IonSelectOption>
                                        <IonSelectOption value="Los Lagos">Los Lagos</IonSelectOption>
                                        <IonSelectOption value="Aysén del General Carlos Ibáñez del Campo">Aysén del General Carlos Ibáñez del Campo</IonSelectOption>
                                        <IonSelectOption value="Magallanes y de la Antártica Chilena">Magallanes y de la Antártica Chilena</IonSelectOption>
                                    </IonSelect>
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="stacked">Comuna</IonLabel>
                                    <IonInput
                                        type="text"
                                        value={usuario.comuna}
                                        onIonChange={e => setUsuario({ ...usuario, comuna: e.detail.value! })}
                                        required
                                    />
                                </IonItem>

                                <IonButton expand="block" type="submit">
                                    Guardar cambios
                                </IonButton>
                            </form>
                        )}

                        {seccionActiva === 'contrasena' && (
                            <form onSubmit={(e) => { e.preventDefault(); handleCambiarContrasena(); }}>
                                <IonItem>
                                    <IonLabel position="stacked">Contraseña actual</IonLabel>
                                    <IonInput
                                        type={mostrarContrasena.actual ? "text" : "password"}
                                        value={contrasenas.actual}
                                        onIonChange={e => setContrasenas({
                                            ...contrasenas,
                                            actual: e.detail.value || ''
                                        })}
                                        required
                                    />
                                    <IonIcon
                                        slot="end"
                                        icon={mostrarContrasena.actual ? eyeOutline : eyeOffOutline}
                                        onClick={() => setMostrarContrasena({
                                            ...mostrarContrasena,
                                            actual: !mostrarContrasena.actual
                                        })}
                                        className="password-toggle"
                                    />
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="stacked">Nueva contraseña</IonLabel>
                                    <IonInput
                                        type={mostrarContrasena.nueva ? "text" : "password"}
                                        value={contrasenas.nueva}
                                        onIonChange={e => setContrasenas({
                                            ...contrasenas,
                                            nueva: e.detail.value || ''
                                        })}
                                        required
                                    />
                                    <IonIcon
                                        slot="end"
                                        icon={mostrarContrasena.nueva ? eyeOutline : eyeOffOutline}
                                        onClick={() => setMostrarContrasena({
                                            ...mostrarContrasena,
                                            nueva: !mostrarContrasena.nueva
                                        })}
                                        className="password-toggle"
                                    />
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="stacked">Confirmar nueva contraseña</IonLabel>
                                    <IonInput
                                        type={mostrarContrasena.confirmar ? "text" : "password"}
                                        value={contrasenas.confirmar}
                                        onIonChange={e => setContrasenas({
                                            ...contrasenas,
                                            confirmar: e.detail.value || ''
                                        })}
                                        required
                                    />
                                    <IonIcon
                                        slot="end"
                                        icon={mostrarContrasena.confirmar ? eyeOutline : eyeOffOutline}
                                        onClick={() => setMostrarContrasena({
                                            ...mostrarContrasena,
                                            confirmar: !mostrarContrasena.confirmar
                                        })}
                                        className="password-toggle"
                                    />
                                </IonItem>

                                <IonButton expand="block" type="submit">
                                    Cambiar contraseña
                                </IonButton>
                            </form>
                        )}
                    </div>
                </div>
            </IonContent>
            <Navbar />
        </IonPage>
    );
};

export default EditarCuenta;