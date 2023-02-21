import styled from 'styled-components'

export const StyledBtn = styled.div`
  & button,
  & input {
    font-size: 14px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & div {
      & button,
      & input {
        padding: 0 15px;
      }
    }
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    display: flex !important;
    flex-wrap: wrap;
    gap: 10px;

    & div {
      display: flex !important;
      flex-wrap: nowrap;
      gap: 5px;
      & button,
      & input {
        padding: 0 12px;
        height: 39px;
      }
    }
  }
`
export const ToleranceInput = styled.div`
  & input {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.grey};
    background: ${({ theme }) => theme.colors.tertiary};
    border: ${({ theme }) => theme.colors.borderBtn};
  }
`
