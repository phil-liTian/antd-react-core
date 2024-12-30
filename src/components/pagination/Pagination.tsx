import { PaginationProps as RcPaginationProps } from 'rc-pagination';

export interface PaginationProps extends RcPaginationProps {
  size?: 'default' | 'small'
}
