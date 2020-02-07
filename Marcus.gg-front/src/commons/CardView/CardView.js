import React, {Component} from 'react';
import styled from 'styled-components';

class CardView extends Component {
  render() {
    return (
      <CardViewContainer flexGrow={this.props.flexGrow}>
        {this.props.children}
      </CardViewContainer>
    );
  }
}

export default CardView

const CardViewContainer = styled.div`
  margin-bottom: 1em;
  background: rgb(32, 43, 67);
  border-radius: 5px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 1.25rem 1.5rem;
  margin-left: ${props => props.flexGrow ? `${props.flexGrow}px` : '0'};
`;
