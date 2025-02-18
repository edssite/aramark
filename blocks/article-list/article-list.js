/**
 * Loads JSON.
 * @param {string} path The path to the JSON resource.
 * @returns {Object} The parsed JSON data.
 */
async function loadJSON(path) {
  console.log('path-----', path);
  if (path) {
    const resp = await fetch(path);
    if (resp.ok) {
      return await resp.json();
    }
  }
  return null;
}

/**
 * @param {HTMLElement} $block The block element.
 */
export default async function decorate($block) {
  // Read the URL from the first link or the block's text content.
  const link = $block.querySelector('a');
  const path = link ? link.getAttribute('href') : $block.textContent.trim();
  const json = await loadJSON(path);
  if (!json) {
    return;
  }
  
  console.log('JSON----', json);
  
  // Clear the block's initial content (for example, any placeholder link)
  $block.innerHTML = '';

  // Create a container for the list. You can add a specific class if you wish.
  const $container = document.createElement('div');
  $container.classList.add('article-list-container');

  // Loop through each article item from the JSON data
  json.data.forEach((article) => {
    // Create the article card container using the same class for consistent styling
    const $articleCard = document.createElement('div');
    $articleCard.classList.add('featured-article'); // reusing your CSS

    // Create the image container
    const $image = document.createElement('div');
    $image.classList.add('image');
    if (article.Image) {
      const $img = document.createElement('img');
      $img.src = article.Image;
      $img.alt = article.Title;
      $image.append($img);
    }

    // Create the text container
    const $text = document.createElement('div');
    $text.classList.add('text');

    // Pretitle (you can customize this text or even use article.Tags)
    const $pre = document.createElement('p');
    $pre.classList.add('pretitle');
    $pre.textContent = 'Article';

    // Title
    const $h2 = document.createElement('h2');
    $h2.textContent = article.Title;

    // Description
    const $p = document.createElement('p');
    $p.textContent = article.Description;

    // Read More link (only if a link exists)
    const $linkWrapper = document.createElement('div');
    if (article.path) {
      const $a = document.createElement('a');
      $a.textContent = 'Read More';
      $a.href = article.Link;
      $a.className = 'button primary';
      $linkWrapper.append($a);
    }

    // Assemble the text container
    $text.append($pre, $h2, $p, $linkWrapper);

    // Assemble the article card
    $articleCard.append($image, $text);

    // Append the article card to the container
    $container.append($articleCard);
  });

  // Append the complete list to the block element
  $block.append($container);
}
