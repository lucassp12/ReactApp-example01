import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List, BtnDetails, BtnRemove } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // Carregar os dados do localStorage
  async componentDidMount() {
    this.setState({ repositories: await this.getLocalRepositories() });
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  getLocalRepositories = async () =>
    JSON.parse(await localStorage.getItem('repositories')) || [];

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        id: response.data.id,
        name: response.data.full_name,
      };

      console.log(data);
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch {
      alert('Repositório não existe!');
      this.setState({
        newRepo: '',
        loading: false,
      });
    }
  };

  handleRemoveRepository = async id => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(
      repository => repository.id !== id
    );

    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem(
      'repositories',
      JSON.stringify(updatedRepositories)
    );
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.id}>
              <span>{repository.name}</span>
              <div>
                <BtnDetails>
                  <Link
                    to={`/repository/${encodeURIComponent(repository.name)}`}
                  >
                    Detalhes
                  </Link>
                </BtnDetails>
                <BtnRemove
                  onClick={() => this.handleRemoveRepository(repository.id)}
                >
                  Remover
                </BtnRemove>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
