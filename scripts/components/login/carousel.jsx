var React = require('react');
var ReactDOM = require('react-dom');

module.exports = Carousel = React.createClass({

  getInitialState: function () {
    return {
      current: "sign_in"
    }
  },

  componentDidMount: function () {
    this.$node = $(ReactDOM.findDOMNode(this));

    this.interfaceWithBootstrap();
  },

  componentDidUpdate: function () {
    this.interfaceWithBootstrap();
  },

  componentDidUnmount: function () {
    this.$node = $(ReactDOM.findDOMNode(this));
  },

  gotoSignIn: function () {
    if (this.state.current != "sign_in") {
      this.$node = $(ReactDOM.findDOMNode(this));
      this.$node.carousel("prev");
      this.state.current = "sign_in";
    }
  },

  gotoSignUp: function () {
    if (this.state.current != "sign_up") {
      this.$node = $(ReactDOM.findDOMNode(this));
      this.$node.carousel("next");
      this.state.current = "sign_up";
    }
  },

  onModalClose: function (e) {
    if (typeof this.props.onModalClose !== "undefined") {
      this.props.onModalClose(e);
    }
  },

  interfaceWithBootstrap: function () {

  },

  render: function () {

    return (
      <div className="carousel slide" data-ride="carousel" data-interval="">
        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-lg-4 col-lg-offset-4">
              <form method="post" action="/auth">
                <div className="form-group">
                  <label htmlFor="username">Електронна пошта</label>
                  <input type="text" className="form-control" name="username" id="username"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <input type="password" className="form-control" name="password" id="password"/>
                </div>
                <div className="form-group">
                  <a href="/user/recovery">Відновлення пароля</a>
                </div>
                <div className="form-group">
                  <input type="submit" name="login" className="form-control" value="Увійти" />
                </div>
              </form>

              <div id="auth_through">
                <div className="legend">Вхід через</div>
                <div id="socials">
                  <a href="/auth/auth/by/facebook" target="_blank"><div className="fb"></div></a>
                  <a href="/auth/auth/by/twitter" target="_blank"><div className="twitter"></div></a>
                  <a href="/auth/auth/by/vkontakte" target="_blank"><div className="vk"></div></a>
                </div>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-lg-4 col-lg-offset-4">
              <form method="post" action="/auth">
                <div>
                  <label>Електронна пошта</label>
                  <input type="text" name="username" className="form-control"/>
                </div>
                <div>
                  <label>Пароль</label>
                  <input type="password" name="password" className="form-control"/>
                </div>

                <div>
                  <label>Повторіть пароль</label>
                  <input type="password" name="password2" className="form-control"/>
                </div>
                <br/>

                <div>
                  <input type="submit" name="register" className="form-control" value="Зареєструватися" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});