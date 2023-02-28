import { Result } from '@yext/answers-headless-react';
/**
 * The config types for each supported card.
 */

export interface StandardCardConfig {
  showOrdinal?: boolean
}
export type CardConfigTypes = StandardCardConfig;

/**
 * CardComponent and the corresponding config options
 */
export interface CardConfig extends CardConfigTypes {
  CardComponent: CardComponent
}
/**
 * The props provided to every {@link CardComponent).
 */
export interface CardProps {
  results: Result[],
  verticalKey: string,
  header?: JSX.Element,
  cardConfig?: CardConfig,
  viewMore?: boolean,
  label?: string
}

/**
 * A functional component that can be used to render a result card.
 */
export type CardComponent = (props: CardConfig) => JSX.Element;