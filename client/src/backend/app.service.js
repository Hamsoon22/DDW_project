export async function getImage(promptText, width = 200, height = 200) {
  return (
    await fetch("http://localhost:4000/api/dreamstudio-image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptText,
        // forced size 256*256
      }),
    })
  ).text();
}

export async function listImages() {
  return (
    await fetch("http://localhost:4000/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  ).json();
}
