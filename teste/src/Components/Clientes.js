import React from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';

class Clientes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            email: '',
            telefone: '',
            clientes: [],
            modalAberta: false
        }
    }

    componentDidMount() {
        this.buscarCliente();
    }

    componentWillUnmount() {

    }

    buscarCliente = () => {
        fetch('https://localhost:7084/api/Cliente')
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ clientes: dados })
            })
    }

    carregaDados = (id) => {
        fetch('https://localhost:7084/api/Cliente/' + id, { method: 'GET' })
            .then(resposta => resposta.json())
            .then(cliente => {
                this.setState({
                    id: cliente.id,
                    name: cliente.name,
                    telefone: cliente.telefone,
                    email: cliente.email

                })
                this.abrirModal();
            })
    }

    deleteCliente = (id) => {
        fetch('https://localhost:7084/api/Cliente/' + id, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarCliente();
                }
            })
    }

    cadastraCliente = (cliente) => {
        fetch('https://localhost:7084/api/Cliente/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarCliente();
                } else {
                    alert('Não foi possivel adicionar o Cliente');
                }
            })
    }

    AtualizarCliente = (cliente) => {
        fetch('https://localhost:7084/api/Cliente/' + cliente.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarCliente();
                } else {
                    alert('Não foi possivel atualizar o Cliente');
                }
            })
    }

    atualizaNome = (e) => {
        this.setState(
            {
                name: e.target.value
            }
        )
    }

    atualizaEmail = (e) => {
        this.setState(
            {
                email: e.target.value
            }
        )
    }

    atualizaTelefone = (e) => {
        this.setState(
            {
                telefone: e.target.value
            }
        )
    }

    submit = () => {

        if (this.state.id == 0) {
            const cliente = {
                id: 0,
                name: this.state.name,
                telefone: this.state.telefone,
                email: this.state.email

            }

            this.cadastraCliente(cliente);
        } else {
            const cliente = {
                id: this.state.id,
                name: this.state.name,
                telefone: this.state.telefone,
                email: this.state.email

            }

            this.AtualizarCliente(cliente);
        }
        this.fecharModal();
    }

    reset = () => {
        this.setState(
            {
                id: 0,
                telefone: 0,
                name: '',
                email: ''
            }
        )
        this.abrirModal();
    }



    renderTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.clientes.map((cliente) =>
                            <tr>
                                <td>{cliente.name}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                                <td><Button variant='secondary' onClick={() => this.carregaDados(cliente.id)}>Atualizar</Button>
                                    <Button variant='danger' onClick={() => this.deleteCliente(cliente.id)}>Excluir</Button></td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        )
    }

    fecharModal = () => {
        this.setState(
            {
                modalAberta: false
            }
        )
    }
    abrirModal = () => {
        this.setState(
            {
                modalAberta: true
            }
        )
    }

    render() {
        return (
            <div>


                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dados do cliente</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        <Form>


                            <Form.Group className="mb-3" >
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={this.state.id} readOnly={true} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do cliente." value={this.state.name} onChange={this.atualizaNome} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Digite o email do cliente" value={this.state.email} onChange={this.atualizaEmail} />
                                <Form.Text className="text-muted">
                                    Utilize seu melhor email.
                                </Form.Text>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o telefone do cliente." value={this.state.telefone} onChange={this.atualizaTelefone} />
                                </Form.Group>
                            </Form.Group>



                            
                           
                        </Form>

                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.submit}>
                                Salvar
                            </Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="warning" type="submit" onClick={this.reset}>
                    Novo
                </Button>

                {this.renderTabela()}
            </div>
        )
    }


}

export default Clientes;