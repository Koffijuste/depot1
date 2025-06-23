// ➤ Mettre à jour le compteur dans le bouton panier
function mettreAJourBadgePanier() {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  const total = panier.reduce((acc, item) => acc + item.quantite, 0);
  const badge = document.getElementById("badgePanier");
  if (badge) {
    badge.textContent = total;
  }
}

// ➤ Ajouter un produit au panier
function ajouterAuPanier(article) {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  const index = panier.findIndex(p => p.id === article.id);
  if (index !== -1) {
    panier[index].quantite++;
  } else {
    panier.push({ ...article, quantite: 1 });
  }
  localStorage.setItem("panier", JSON.stringify(panier));
  mettreAJourBadgePanier(); // ✅ mettre à jour le badge
  alert(`✅ "${article.nom}" a été ajouté au panier.`);
}

// ➤ Attendre que la page soit chargée avant de tout exécuter
window.addEventListener("DOMContentLoaded", () => {
  
  // ➤ Initialiser le badge dès le départ
  mettreAJourBadgePanier();

  // ➤ Gérer le bouton Panier (vérifier si connecté)
  const btnPanier = document.getElementById("btnPanier");
 

  // ➤ Ajouter l'action à chaque bouton "AJOUTER AU PANIER"
  document.querySelectorAll('.ajouter-panier').forEach((btn) => {
    btn.addEventListener('click', function () {
      const article = this.closest('.produits-item');
      const produit = {
        id: parseInt(article.dataset.id),
        nom: article.dataset.nom,
        prix: parseInt(article.dataset.prix),
        image: article.dataset.image
      };
      ajouterAuPanier(produit);
    });
  });

});
