// Niveau 2 : consommer une API REST existante avec fetch.
const API = 'https://jsonplaceholder.typicode.com/posts';

const liste = document.getElementById('liste');
const message = document.getElementById('message');
const form = document.getElementById('form-article');

function afficher(texte, classe) {
  message.textContent = texte;
  message.className = classe;
}

// GET : les 5 premiers articles
async function charger() {
  // TODO 1 : appeler `${API}?_limit=5` avec l'en-tête Accept: application/json.
  try {
    const response = await fetch(`${API}?_limit=5`, {
      headers: {
        'Accept': 'application/json'
        
      }
    });
  // TODO 2 : si reponse.ok est faux, afficher le code d'erreur et s'arrêter.
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

      const result = await response.json();
      console.log(result);
      // TODO 3 : vider #liste, puis créer un <li> par article (id et title)
      //          avec un bouton « Supprimer » qui appelle supprimer(article.id).

      // Vider la liste 
      liste.innerHTML ='';

      //Parcours de chaque article 
      result.forEach(_element => {
        // Créer un li
        const li = document.createElement('li');
        
        // Créer le bouton
        const button = document.createElement('button');

        // Ajouter du texte 
        li.textContent = `${_element.id} - ${_element.title}`;
        button.textContent = `Supprimer`

        // Ce qui permet d'effacer la ligne 
        button.addEventListener('click', async () => {
          await supprimer(_element.id);
          li.remove();
        });

        // Afficher les élements filles 
        liste.appendChild(li);
        li.appendChild(button);
      });
    } catch (error) {
      console.error(error.message);
    }
}

// POST : créer un article
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { title, body } = Object.fromEntries(new FormData(form));

  // TODO 4 : envoyer { title, body, userId: 1 } en JSON (POST, en-tête Content-Type).
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ title, body, userId: 1 })
  });

  // TODO 5 : si le statut est 201, afficher l'identifiant attribué puis recharger la liste.
  //          Le nouvel article apparaît-il ? Pourquoi ?
  if (response.status === 201) {
    const reponse = await response.json();
    console.log(reponse.id);
  }
});

// DELETE : supprimer un article
async function supprimer(id) {
  // TODO 6 : envoyer DELETE sur `${API}/${id}` et afficher le code reçu.
  const response = await fetch (`${API}/${id}`,{
    method: `DELETE`
  });

  console.log(`Statut de suppression : ${response.status}`);
}

charger();
