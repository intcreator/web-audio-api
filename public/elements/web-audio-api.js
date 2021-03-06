import '../styles/styles.js';
import '../styles/syntax-highlighting.js';
import './feedback-form.js';
import './audio-demo.js';
import './markdown-element.js';
import { PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/app-route/app-location.js';
/**
 * @customElement
 * @polymer
 */
class WebAudioApi extends PolymerElement {
  static get template() {
    return `
    <style is="custom-style" include="int-styles syntax-highlighting">
      :host {
        --container-width: 1050px;
        --wide-container-width: 1200px;
        --sidebar-width: 14em;
        --wide-sidebar-width: 18em;
        --grid-gap-width: 1em;
        --menu-icon-size: calc(2.5em + 3vw);
        display: block;
        margin: auto;
        max-width: var(--container-width);
      }

      #container {
        display: grid;
        grid-template-columns: var(--sidebar-width) calc(100% - var(--sidebar-width) - var(--grid-gap-width));
        grid-column-gap: var(--grid-gap-width);
      }

      #container > * {
        padding: 1em;
      }

      #contents {
        background-color: #414141;
      }

      #menu-icon {
        display: none;
      }

      .menu-open,
      .menu-closed {
        display: block;
      }

      /* larger screens */
      @media (min-width: 1200px) {
        :host {
          max-width: var(--wide-container-width);
        }

        #container {
          grid-template-columns: var(--wide-sidebar-width) calc(100% - var(--wide-sidebar-width) - var(--grid-gap-width));
        }
      }

      /* smaller screens */
      @media (max-width: 1050px) {
        #container {
          display: block;
        }

        #contents {
          position: fixed;
          z-index: 1;
          height: 100vh;
          width: var(--wide-sidebar-width);
          box-sizing: border-box;
          overflow: auto;
        }

        .menu-open {
          display: block;
        }

        .menu-closed {
          display: none;
        }

        .uncovering {
          opacity: 0;
        }

        .covering {
          opacity: .6;
        }

        #menu-icon {
          display: block;
          position: fixed;
          z-index: 2;
          right: 0;
          height: var(--menu-icon-size);
          width: var(--menu-icon-size);
          background: black;
        }

        #menu-screen {
          background: rgba(0, 0, 0, 1);
          width: 150vw;
          height: 150vh;
          position: fixed;
          z-index: 1;
        }
      }
    </style>

    <app-location route="{{route}}" url-space-regex="^\\/?(?!([a-zA-Z]*\\/[a-zA-Z]+.*){2})"></app-location>
    <app-route route="{{route}}" pattern="/:slug" active="{{active}}" data="{{data}}"></app-route>

    <iron-icon id="menu-icon" icon="[[menuIcon]]" on-click="toggleMenu"></iron-icon>
    <div id="menu-screen" class\$="[[menuCovering]]" on-click="toggleMenu"></div>
    
    <div id="container">
      <markdown-element id="contents" src="/pages/contents.md" class\$="[[menuStatus]]">
        <div slot="markdown-html"></div>
      </markdown-element>
      <markdown-element src="[[url]]">
        <div slot="markdown-html"></div>
      </markdown-element>
    </div>

    <footer>
      Copyright © Brandon der Blätter [[date]].  Part of the <a href="https://interlucid.com/" target="_blank">Interlucid</a> project.
      <br> Star or fork on
      <a href="https://github.com/interlucid/web-audio-api" target="_blank">GitHub</a>. Support me on
      <a href="https://www.patreon.com/interlucid" target="_blank">Patreon</a>!
    </footer>
`;
  }

  static get properties() {
    return {
      url: {
        type: String,
        computed: 'computeSlug(data.slug)'
      },
      date: {
        type: String,
        value: new Date().getFullYear()
      },
      menuOpen: {
        type: Boolean,
        value: false
      },
      menuIcon: {
        type: String,
        computed: 'computeMenuIcon(menuOpen)'
      },
      menuStatus: {
        type: String,
        computed: 'computeMenuStatus(menuOpen)'
      },
      menuCovering: {
        type: String,
        computed: 'computeMenuCovering(menuOpen)'
      }
    };
  }

  computeSlug(dataSlug) {
    return `/pages/${(!dataSlug || dataSlug === '') ? 'intro' : dataSlug}.md`;
  }

  computeMenuIcon(menuOpen) {
    return menuOpen ? 'clear' : 'menu';
  }

  computeMenuStatus(menuOpen) {
    return menuOpen ? 'menu-open' : 'menu-closed';
  }

  computeMenuCovering(menuOpen) {
    return menuOpen ? 'covering' : 'uncovering';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  resetMenu() {
    this.menuOpen = true;
  }
}

window.customElements.define('web-audio-api', WebAudioApi);
