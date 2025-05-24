const PORT = process.env.NEXT_PUBLIC_API_URL;

export const getFotos = async () => {
    console.log(PORT);
    
  //aca me olvide de hacer el try catch en la peticion
  try {
    const response = await fetch(`${PORT}/photos/active`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error en la peticion");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};


