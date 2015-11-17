import React from 'react';

export default class DetailsMain extends React.Component {
  _getDaysLeft(secondDate) {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var today = new Date();
    return Math.round(Math.abs((today.getTime() - secondDate.getTime())/(oneDay))) - 1;
  }

  render() {
    let correctUrl = this.props.ad.url.substr(0, 60) + (this.props.ad.url.length < 61 ? "" : "..." );
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 image">
          <img src={"http://saleon.info/media/" + this.props.ad.image} className="img-polaroid" />
        </div>
        <div className="col-xs-12 col-sm-6 ad-details-contacts">
          <p>{this.props.ad.description}</p>
          <div><strong>Залишилося днів:</strong> {this._getDaysLeft(new Date(this.props.ad.end_dt))}</div>
          <br/>
          <div><i className="fa fa-tags"></i>{this.props.ad.brand_name}</div>
          <div><i className="fa fa-map-marker"></i>{this.props.ad.address}</div>
          <div><i className="fa fa-phone"></i>{this.props.ad.phone}</div>
          <div><i className="fa fa-envelope-o"></i><a href={"mailto:" + this.props.ad.email}>{this.props.ad.email}</a></div>
          <div><i className="fa fa-link"></i><a target="_blank" href={this.props.ad.url}>{correctUrl}</a></div>
          {/*<br/><strong>Поділитись акцією</strong>*/}
        </div>
      </div>
    )
  }
}