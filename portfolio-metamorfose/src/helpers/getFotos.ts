const PORT = process.env.NEXT_PUBLIC_API_URL;

export const getFotos = async () => {
    console.log(PORT);
    
  try {
    const response = await fetch(`${PORT}/photos/active`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error en la peticion");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};


