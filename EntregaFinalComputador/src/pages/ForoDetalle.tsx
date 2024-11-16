import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { IonPage, IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonButton,IonInput,IonTextarea,IonList,IonItem,IonLabel,IonFab,IonFabButton,IonIcon,IonModal,IonCardSubtitle,useIonRouter} from "@ionic/react";
import { add, chatbubbleOutline } from 'ionicons/icons';
import Navbar from "../components/Navegationbar";
import Head from '../components/HeadIcon';
import './Foro.css';


interface Post {
    idPublicacion: number;
    tituloPublicacion: string;
    contenido: string;
    fecha: string;
    nombreUsuario: string;
    numComentarios: number;
    comentarios?: Comentario[];
  }
  
  interface Comentario {
    idPublicacion: number;
    contenido: string;
    fecha: string;
    nombreUsuario: string;
  }
  
  const ForoDetalle: React.FC = () => {
    const { idForo } = useParams<{ idForo: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nuevoPost, setNuevoPost] = useState({
      tituloPublicacion: '',
      contenido: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [comentarioAbierto, setComentarioAbierto] = useState<number | null>(null);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comentarios, setComentarios] = useState<{ [key: number]: Comentario[] }>({});
  
    useEffect(() => {
      cargarPosts();
    }, [idForo]);
  
    const cargarPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/foro/foros/${idForo}/posts`);
        if (!response.ok) throw new Error('Error al cargar posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los posts');
      } finally {
        setLoading(false);
      }
    };
  
    const cargarComentarios = async (idPublicacion: number) => {
      try {
        const response = await fetch(`http://localhost:3000/api/foro/comentarios/${idPublicacion}`);
        if (!response.ok) throw new Error('Error al cargar comentarios');
        const data = await response.json();
        setComentarios(prev => ({
          ...prev,
          [idPublicacion]: data
        }));
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los comentarios');
      }
    };
  
    const crearPost = async () => {
      const usuarioActual = localStorage.getItem('usuario');
      const idUsuario = usuarioActual ? JSON.parse(usuarioActual).id : null;
  
      if (!idUsuario) {
        setError('Debes iniciar sesión para publicar');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/foro/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...nuevoPost,
            idUsuario,
            idForo
          })
        });
  
        if (!response.ok) throw new Error('Error al crear el post');
        
        setIsModalOpen(false);
        setNuevoPost({ tituloPublicacion: '', contenido: '' });
        cargarPosts();
      } catch (error) {
        console.error('Error:', error);
        setError('Error al crear el post');
      }
    };
  
    const crearComentario = async (idPublicacion: number) => {
      const usuarioActual = localStorage.getItem('usuario');
      const idUsuario = usuarioActual ? JSON.parse(usuarioActual).id : null;
  
      if (!idUsuario) {
        setError('Debes iniciar sesión para comentar');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/foro/comentarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contenido: nuevoComentario,
            idUsuario,
            idComentarioPadre: idPublicacion,
            idForo
          })
        });
  
        if (!response.ok) throw new Error('Error al crear el comentario');
        
        setNuevoComentario('');
        cargarComentarios(idPublicacion);
        cargarPosts();
      } catch (error) {
        console.error('Error:', error);
        setError('Error al crear el comentario');
      }
    };
  
    if (loading) {
      return (
        <IonPage>
          <Head />
          <IonContent>
            <h2 style={{marginLeft:'20px'}}>Cargando...</h2>
          </IonContent>
          <Navbar />
        </IonPage>
      );
    }
  
    return (
      <IonPage>
        <Head />
        <IonContent>
          <div className="foro-container">
            {posts.map((post) => (
              <IonCard key={post.idPublicacion} className="post-card">
                <IonCardHeader>
                  <IonCardTitle>{post.tituloPublicacion}</IonCardTitle>
                  <IonCardSubtitle>
                    Por: {post.nombreUsuario} - {new Date(post.fecha).toLocaleDateString()}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>{post.contenido}</p>
                  <div className="post-footer">
                    <IonButton 
                      fill="clear"
                      onClick={() => {
                        setComentarioAbierto(post.idPublicacion);
                        cargarComentarios(post.idPublicacion);
                      }}
                    >
                      <IonIcon slot="start" icon={chatbubbleOutline} />
                      {post.numComentarios} Comentarios
                    </IonButton>
                  </div>
                  {comentarioAbierto === post.idPublicacion && (
                    <div className="comentario-section">
                      {comentarios[post.idPublicacion]?.map((comentario) => (
                        <IonCard key={comentario.idPublicacion} className="comentario-card">
                          <IonCardContent>
                            <p>{comentario.contenido}</p>
                            <small>
                              Por: {comentario.nombreUsuario} - {new Date(comentario.fecha).toLocaleDateString()}
                            </small>
                          </IonCardContent>
                        </IonCard>
                      ))}
                      <div className="comentario-form">
                        <IonItem>
                          <IonTextarea
                            value={nuevoComentario}
                            onIonChange={e => setNuevoComentario(e.detail.value || '')}
                            placeholder="Escribe tu comentario..."
                            rows={3}
                          />
                        </IonItem>
                        <IonButton 
                          expand="block"
                          onClick={() => crearComentario(post.idPublicacion)}
                          disabled={!nuevoComentario.trim()}
                        >
                          Comentar
                        </IonButton>
                      </div>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </div>
  
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => setIsModalOpen(true)}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
  
          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <IonContent>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Nueva Publicación</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="stacked">Título</IonLabel>
                    <IonInput
                      value={nuevoPost.tituloPublicacion}
                      onIonChange={e => setNuevoPost({
                        ...nuevoPost,
                        tituloPublicacion: e.detail.value || ''
                      })}
                      placeholder="Escribe un título"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Contenido</IonLabel>
                    <IonTextarea
                      value={nuevoPost.contenido}
                      onIonChange={e => setNuevoPost({
                        ...nuevoPost,
                        contenido: e.detail.value || ''
                      })}
                      placeholder="Escribe tu mensaje"
                      rows={6}
                    />
                  </IonItem>
                  {error && <p style={{color: 'red'}}>{error}</p>}
                  <IonButton 
                    expand="block" 
                    onClick={crearPost}
                    disabled={!nuevoPost.tituloPublicacion || !nuevoPost.contenido}
                  >
                    Publicar
                  </IonButton>
                  <IonButton 
                    expand="block" 
                    fill="clear" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonModal>
        </IonContent>
        <Navbar />
      </IonPage>
    );
  };
  
  export default ForoDetalle;