import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars, faTimes, faLink, faCode, faStar, faBalanceScale } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(
    faBalanceScale,
    faBars,
    faCode,
    faLink,
    faStar,
    faTimes,

    faGithub
)

Vue.component('fa', FontAwesomeIcon)
