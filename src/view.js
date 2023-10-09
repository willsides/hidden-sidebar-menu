document.addEventListener("DOMContentLoaded", function() {
    // Adds the toggle function to the menu button
    const wsMenuToggleButtons = document.querySelectorAll('.wp-block-willsides-hidden-sidebar-menu button.ws-menu-toggle');

    const wsHandleMenuClosure = event => {
        wsMenuToggleButtons.forEach((wsMenuToggleButton) => {
            const menuContentWrapper = wsMenuToggleButton.nextElementSibling;
            if (!menuContentWrapper.contains(event.target)) {
                wsMenuToggleButton.setAttribute('aria-expanded', false);
                menuContentWrapper.setAttribute('aria-hidden', true);
            }
        });
    };

    wsMenuToggleButtons.forEach((wsMenuToggleButton) => {
        const menuContentWrapper = wsMenuToggleButton.nextElementSibling;

        wsMenuToggleButton.addEventListener('click', event => {
            event.stopPropagation();
            const isExpanded = JSON.parse(wsMenuToggleButton.getAttribute('aria-expanded'));
            wsMenuToggleButton.setAttribute('aria-expanded', !isExpanded);
            menuContentWrapper.setAttribute('aria-hidden', isExpanded);
        });
    });

    window.addEventListener('click', wsHandleMenuClosure);
    window.addEventListener('focusin', wsHandleMenuClosure);
});