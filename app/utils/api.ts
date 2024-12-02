import { Post } from "./types";

const url = "http://10.0.2.2:3000";

export async function getMonsters() {
  try {
    const response = await fetch(`${url}/monster`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
}

export async function getPosts() {
  try {
    const response = await fetch(`${url}/post`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
}

export async function addPost(post: Post) {
  try {
    const response = await fetch(`${url}/post/newPost`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ post }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return {};
  }
}

export async function addComment(id: string, text: string, authorId: string) {
  try {
    const response = await fetch(`${url}/post/newComment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ text, authorId }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return {};
  }
}

export async function addLike(id: string) {
  try {
    const response = await fetch(`${url}/post/newLike/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return {};
  }
}
