import styled from "styled-components";
// Used for wrapping a page component
export const Screen = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;

export const TextTitle = styled.p`
  color: var(--white);
  font-size: 20px;
  font-weight: 500;
`;

export const TextSubTitle = styled.p`
  color: var(--white);
  font-size: 16px;
  font-weight: 500;
`;

export const TextDescription = styled.p`
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  padding: 2px;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;

export const StyledButton = styled.button`
  padding: "20px";
  background: "rgb(242,204,143)";
`;

// export const Card = styled.div`
//   background-color: ${({ test }) => (test ? "pink" : "none")};
//   width: 100%;
//   background-image: ${({ image }) => (image ? `url(${image})` : "none")};
//   background-size: cover;
//   background-position: center;
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
//   transition: 0.3s;
//   width: 40%;
// `;

// export const HoverCard = styled.div`
//   :hover {
//     box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
//   }
// `;
