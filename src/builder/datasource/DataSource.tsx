import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';

import { GlobalTable, Inline, Join, Lookup, Query, Table, Union } from './';
import { QueryBuilderProps, QueryBuilderOptions } from '../types';

interface State {
  selectedOption: SelectableValue<string>;
}

export class DataSource extends PureComponent<QueryBuilderProps, State> {
  state: State = {
    selectedOption: {},
  };

  constructor(props: QueryBuilderProps) {
    super(props);

    this.selectOptions = this.buildSelectOptions([
      'GlobalTable',
      'Inline',
      'Join',
      'Lookup',
      'Query',
      'Table',
      'Union',
    ]);

    const { builder } = props.options;

    if (undefined !== builder.type) {
      const selectedOption = this.selectOptionByValue(builder.type);
      if (null !== selectedOption) {
        this.state.selectedOption = selectedOption;
      }
    }
  }

  onSelectionChange = (option: SelectableValue<string>) => {
    this.selectOption(option);
  };

  onCustomSelection = (selection: string) => {
    const option: SelectableValue<string> = { value: selection.toLowerCase(), label: selection };
    this.selectOptions.push(option);
    this.selectOption(option);
  };

  selectOption = (option: SelectableValue<string>) => {
    this.setState({ selectedOption: option });
  };

  onOptionsChange = (options: QueryBuilderOptions) => {
    const { onOptionsChange } = this.props;
    onOptionsChange(options);
  };

  selectOptions: Array<SelectableValue<string>> = [];

  buildSelectOptions = (values: string[]): Array<SelectableValue<string>> => {
    return values.map((key, index) => {
      return { label: key, value: key.toLowerCase() };
    });
  };

  selectOptionByValue = (value: string): SelectableValue<string> | null => {
    const options = this.selectOptions.filter(option => option.value === value.toLowerCase());
    if (options.length > 0) {
      return options[0];
    }
    return null;
  };

  builderOptions = (): QueryBuilderOptions => {
    const { builder, settings } = this.props.options;
    return { builder: builder || {}, settings: settings || {} };
  };

  render() {
    const { selectedOption } = this.state;
    const builderOptions = this.builderOptions();
    return (
      <>
        <div className="gf-form">
          <label className="gf-form-label">Datasource</label>
          <div
            className={css`
              width: 300px;
            `}
          >
            <Select
              options={this.selectOptions}
              value={selectedOption}
              allowCustomValue
              onChange={this.onSelectionChange}
              onCreateOption={this.onCustomSelection}
            />
          </div>
        </div>
        <div>
          {selectedOption.value === 'globaltable' && (
            <GlobalTable options={builderOptions} onOptionsChange={this.onOptionsChange} />
          )}
          {selectedOption.value === 'inline' && (
            <Inline options={builderOptions} onOptionsChange={this.onOptionsChange} />
          )}
          {selectedOption.value === 'join' && <Join options={builderOptions} onOptionsChange={this.onOptionsChange} />}
          {selectedOption.value === 'lookup' && (
            <Lookup options={builderOptions} onOptionsChange={this.onOptionsChange} />
          )}
          {selectedOption.value === 'query' && (
            <Query options={builderOptions} onOptionsChange={this.onOptionsChange} />
          )}
          {selectedOption.value === 'table' && (
            <Table options={builderOptions} onOptionsChange={this.onOptionsChange} />
          )}
          {selectedOption.value === 'union' && (
            <Union options={builderOptions} onOptionsChange={this.onOptionsChange} />
          )}
        </div>
      </>
    );
  }
}
