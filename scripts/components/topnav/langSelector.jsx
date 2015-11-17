/**
 * @jsx React.DOM
 */

var app = app || {};

(function () {
  'use strict'
  app.components.LangSelector = React.createClass({
    render: function () {

      var langs = [
        {alias: "ua", title: "Українська"},
        {alias: "ru", title: "Русский"},
        {alias: "en", title: "English"},
        {alias: "pl", title: "Polski"}
      ];

      var langsList = langs.map(function (item) {
        var langClass = "lng " + item.alias;

        return <li>
          <a id={item.alias} className={langClass} title={item.title} href="#"></a>
        </li>
      });

      return (
        <div className="top-nav-plugin" data-toggle="tooltip" title="Мова сайту">
          <button className="lng ua lng-btn"></button>
          <ul className="dropdown-menu">
            <li>
              <a id="ua" className="lng ua" title="Українська" href="#"></a>
            </li>
            <li>
              <a id="ru" className="lng ru" title="Русский" href="#"></a>
            </li>
            <li>
              <a id="en" className="lng en" title="English" href="#"></a>
            </li>
            <li>
              <a id="pl" className="lng pl" title="Polski" href="#"></a>
            </li>
          </ul>
        </div>
      )
    }
  });
})();