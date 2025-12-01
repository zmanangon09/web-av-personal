const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

export async function getProducts() {
    const resp = await fetch(API_URL);
    if (!resp.ok) {
        throw new Error("Error al cargar productos");
    }
    const data = await resp.json();
    return data;
}
