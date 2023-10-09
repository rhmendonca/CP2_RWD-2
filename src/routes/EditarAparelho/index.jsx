import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from './index.module.css';

function EditarAparelho() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estado para acompanhar as edições
    const [imageFile, setImageFile] = useState(null);
    const [aparelho, setAparelho] = useState({
        nome: "",
        descricaoCurta: "",
        descricaoExtensa: "",
        preco: "",
        imagem: "",
    });
    const [editedAparelho, setEditedAparelho] = useState(null);
  

    useEffect(() => {
        fetch(`http://localhost:5000/aparelhos/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setAparelho(data);
            setEditedAparelho(data);
        })
        .catch((error) => {
            console.error('Erro ao carregar aparelho:', error);
        });
    }, [id]);

    // Atualizar o aparelho com as edições
    const updateAparelho = () => {
        fetch(`http://localhost:5000/aparelhos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedAparelho),
        })
        .then(() => {
            navigate(`/aparelhos/${id}`);
        })
        .catch((error) => {
            console.error('Erro ao atualizar aparelho:', error);
        }); 
    };

    // Função para lidar com o upload de imagem
    const handleImageUpload = (files) => {
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                // Quando o upload é bem-sucedido, atualize o estado do arquivo de imagem
                setImageFile(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    // Função para lidar com as alterações nos campos de edição
    const handleFieldChange = (field, value) => {
        setEditedAparelho({
            ...editedAparelho,
            [field]: value,
        });
    };

    // Função para salvar as edições
    const handleSave = () => {
        if (editedAparelho) {
            if (imageFile) {
                // Se houver uma nova imagem, atualize a propriedade 'imagem' do aparelho
                editedAparelho.imagem = imageFile;
            }
            updateAparelho(editedAparelho);
            navigate(`/aparelhos/${id}`);
        }
    };

    if (!editedAparelho) {
        return <p>Aparelho não encontrado.</p>;
    }


    return (
        <div className={styles.container}>
            <h2>Editar {aparelho.nome}</h2>
            <label htmlFor="imagem">Upload de Imagem:</label>
            <input
                type="file"
                id="imagem"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
            />
            {imageFile ? (
                <img src={imageFile} alt={editedAparelho.nome} className={styles.smartphoneImage} />
            ) : (
                <img src={editedAparelho.imagem} alt={editedAparelho.nome} className={styles.smartphoneImage} />
            )}
            <label htmlFor="nome">Nome:</label>
            <input
                type="text"
                id="nome"
                value={editedAparelho.nome}
                onChange={(e) => handleFieldChange('nome', e.target.value)}
            />
            <label htmlFor="descricaoCurta">Descrição Curta:</label>
            <textarea
                id="descricaoCurta"
                value={editedAparelho.descricaoCurta}
                onChange={(e) => handleFieldChange('descricaoCurta', e.target.value)}
                className={styles.descricaoCurta}
            />
            <label htmlFor="descricaoExtensa">Descrição Extensa:</label>
            <textarea
                id="descricaoExtensa"
                value={editedAparelho.descricaoExtensa}
                onChange={(e) => handleFieldChange('descricaoExtensa', e.target.value)}
                className={styles.descricaoExtensa}
            />
            <label htmlFor="preco">Preço:</label>
            <input
                type="text"
                id="preco"
                value={editedAparelho.preco}
                onChange={(e) => handleFieldChange('preco', e.target.value)}
            />
            <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
        </div>
    );
}

export default EditarAparelho;