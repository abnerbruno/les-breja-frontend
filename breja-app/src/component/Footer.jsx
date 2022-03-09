import { Component } from "react";

class Footer extends Component {
    
    render(){
        return(
            <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="/home" class="nav-link px-2 text-muted">Home</a></li>
                <li class="nav-item"><a href="/Produtos" class="nav-link px-2 text-muted">Produtos</a></li>
                <li class="nav-item"><a href="/Troca" class="nav-link px-2 text-muted">Troca</a></li>
                <li class="nav-item"><a href="/FAQs" class="nav-link px-2 text-muted">FAQs</a></li>
                <li class="nav-item"><a href="/Contato" class="nav-link px-2 text-muted">Contato</a></li>
            </ul>
            <p class="text-center text-muted">&copy; 2022 Company, Inc</p>
    </footer>
        )
    }
}

export default Footer;