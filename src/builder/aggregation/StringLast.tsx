import React, { PureComponent, ChangeEvent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { css } from 'emotion';
import { QueryBuilderProps } from '../types';

const { FormField } = LegacyForms;

export class StringLast extends PureComponent<QueryBuilderProps> {
  constructor(props: QueryBuilderProps) {
    super(props);
    this.resetBuilder(['type', 'name', 'fieldName', 'maxStringBytes']);
    const { builder } = props.options;
    builder.type = 'stringLast';
  }

  resetBuilder = (properties: string[]) => {
    const { builder } = this.props.options;
    for (let key of Object.keys(builder)) {
      if (!properties.includes(key)) {
        delete builder[key];
      }
    }
  };

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { options, onOptionsChange } = this.props;
    const { builder } = options;
    let value: any = event.target.value;
    if ('number' === event.target.type) {
      value = Number(value);
    }
    builder[event.target.name] = value;
    onOptionsChange({ ...options, builder: builder });
  };

  render() {
    const { builder } = this.props.options;
    return (
      <>
        <div className="gf-form">
          <div
            className={css`
              width: 300px;
            `}
          >
            <FormField
              label="Name"
              name="name"
              type="text"
              placeholder="Output name for the summed value"
              value={builder.name}
              onChange={this.onInputChange}
            />
            <FormField
              label="Field name"
              name="fieldName"
              type="text"
              placeholder="Name of the metric column to sum over"
              value={builder.fieldName}
              onChange={this.onInputChange}
            />
            <FormField
              label="Max string bytes"
              name="maxStringBytes"
              type="number"
              placeholder="Max string bytes"
              value={builder.maxStringBytes}
              onChange={this.onInputChange}
            />
          </div>
        </div>
      </>
    );
  }
}
