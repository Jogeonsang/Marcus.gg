import React from 'react';
import styled from 'styled-components';

const MoreButton = () => {
  return (
    <MoreButtonWrapper>
      더 보기
    </MoreButtonWrapper>
  )
};

export default MoreButton

const MoreButtonWrapper = styled.div`
  padding-top: 2px;
  font-size: 0.875rem;
  line-height: 1;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(121, 134, 163);
  height: 2.25rem;
  user-select: none;
  cursor: pointer;
  margin: 1rem 0px 0px;
  background: rgb(24, 35, 56);
  border-radius: 5px;
  transition: all 0.15s ease 0s;
`;
