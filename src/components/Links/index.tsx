import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'

const StyledInternalLink = styled('a')`
  text-decoration: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.bgPrimaryButton};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

const InternalLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <StyledInternalLink>{children}</StyledInternalLink>
    </Link>
  )
}

export default InternalLink
