export async function getUserDataById(userId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/porkManagerApi/usuario/getUsuario/${userId}`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados do usuário');
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }