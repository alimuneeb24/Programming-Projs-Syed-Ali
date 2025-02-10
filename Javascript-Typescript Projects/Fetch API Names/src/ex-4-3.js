async function fetchnames() {
    try {
        const response = await fetch('names.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching names:", error);
        return [];
    }
}

async function filtername() {
    const names = await fetchnames();
    const input = document.getElementById('inp');
    const suggestions = document.createElement('div');
    suggestions.setAttribute('id', 'suggestions');
    input.parentNode.appendChild(suggestions);

    let currentIndex = -1;

    input.addEventListener('input', function () {
        const filter = input.value.toLowerCase();
        const filteredNames = names.filter(name => name.toLowerCase().startsWith(filter));

        suggestions.innerHTML = '';
        currentIndex = -1;

        if (filter && filteredNames.length > 0) {
            filteredNames.forEach(name => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = name;
                suggestionItem.classList.add('suggestion-item');
                suggestions.appendChild(suggestionItem);

                suggestionItem.addEventListener('click', () => {
                    input.value = name;
                    suggestions.innerHTML = '';
                });
            });
        }
    });

    input.addEventListener('keydown', function (e) {
        const items = suggestions.querySelectorAll('.suggestion-item');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (items.length > 0) {
                currentIndex = (currentIndex + 1) % items.length;
                updateHighlight(items, currentIndex);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (items.length > 0) {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateHighlight(items, currentIndex);
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentIndex >= 0 && items[currentIndex]) {
                input.value = items[currentIndex].textContent;
                suggestions.innerHTML = '';
                currentIndex = -1;
            }
        }
    });

    function updateHighlight(items, index) {
        items.forEach((item, i) => {
            item.classList.toggle('highlight', i === index);
        });
    }
}

document.addEventListener('DOMContentLoaded', filtername);
