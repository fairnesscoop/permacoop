import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {AppState} from '../../../store/reducers';
import {LoggedUser} from '../../auth/models/LoggedUser';
import {logout} from '../../auth/actions/authentication';
import {IAuthenticationLogoutAction} from '../../auth/types/authentication';

interface IProps {
  user: LoggedUser | null;
  logout(): IAuthenticationLogoutAction;
}

const Menu: React.FC<IProps> = ({user, logout}) => {
  const {t} = useTranslation();

  return (
    <>
      <Navbar bg={'dark'} variant={'dark'} expand={'lg'} fixed={'top'}>
        <Link className={'navbar-brand'} to={'/'}>
          <img src={'/images/logo.png'} alt={'Fairness'} height={42} />
        </Link>
        {user && (
          <>
            <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
            <Navbar.Collapse id={'basic-navbar-nav'}>
              <Nav className={'mr-auto'}>
                <Nav>
                  <NavDropdown
                    title={'Administratifs'}
                    id={'basic-nav-dropdown'}
                    alignRight={true}
                  >
                    <Link to={'/'} className={'dropdown-item'}>
                      CRA
                    </Link>
                    <NavDropdown.Divider />
                    <Link to={'/projects'} className={'dropdown-item'}>
                      {t('project.title')}
                    </Link>
                    <NavDropdown.Divider />
                    <Link className={'dropdown-item'} to={'/customers'}>
                      {t('customer.title')}
                    </Link>
                    <NavDropdown.Divider />
                    <Link to={'/tasks'} className={'dropdown-item'}>
                      {t('task.title')}
                    </Link>
                  </NavDropdown>
                </Nav>
                <Link className={'nav-link'} to={'/users'}>
                  {t('user.title')}
                </Link>
                <a
                  href={'https://trello.com/b/wWIwS9KI/fairnesscrm'}
                  className={'nav-link'}
                  target={'_blank'}
                >
                  CRM
                </a>
                <Link className={'nav-link'} to={'/'}>
                  Protocole de décisions
                </Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className={'justify-content-end'}>
              <Nav>
                <NavDropdown
                  title={user.firstName + ' ' + user.lastName}
                  id={'basic-nav-dropdown'}
                  alignRight={true}
                >
                  <NavDropdown.Item onClick={logout}>
                    {t('logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </>
  );
};

export default connect(
  (state: AppState) => ({
    user: state.auth.authentication.user
  }),
  dispatch => ({...bindActionCreators({logout}, dispatch)})
)(Menu);
