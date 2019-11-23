import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Input from "../components/input";
import { DefaultValues } from "../static";

class ConfigureForm extends Component {
  state = {
    participantsCount: DefaultValues.PARTICIPANTS_COUNT,
    participantsCountErrorMessage: "",
    poolsCount: DefaultValues.POOL_COUNT,
    poolsCountErrorMessage: "",
    qualifiersCountPerPool: DefaultValues.QUALIFIERS_COUNT_PER_POOL,
    qualifiersCountPerPoolErrorMessage: ""
  };

  setStateHandler = (key, value) => {
    this.setState({ [key]: value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const {
      participantsCount,
      poolsCount,
      qualifiersCountPerPool
    } = this.state;

    const { history } = this.props;

    if (parseInt(participantsCount) < parseInt(poolsCount)) {
      this.setState({
        participantsCountErrorMessage:
          "Participants Count cannot be less than Pools count"
      });
    } else if (
      parseInt(participantsCount) <
      parseInt(poolsCount) * parseInt(qualifiersCountPerPool)
    ) {
      this.setState({
        qualifiersCountPerPoolErrorMessage:
          "(Number of qualifiers from each pool) * (Number of pool) cannot be greater than Number of participants"
      });
    } else {
      const {
        location: { search: searchString }
      } = history;

      const newSearch = {
        ...queryString.parse(searchString),
        participantsCount,
        poolsCount,
        qualifiersCountPerPool,
        tab: DefaultValues.TAB
      };

      history.push({
        pathname: "/home",
        search: queryString.stringify(newSearch)
      });
    }
  };

  render() {
    const {
      participantsCount,
      poolsCount,
      qualifiersCountPerPool,
      participantsCountErrorMessage,
      poolsCountErrorMessage,
      qualifiersCountPerPoolErrorMessage
    } = this.state;

    return (
      <form onSubmit={this.onSubmitHandler}>
        <div className="inputs-container">
          <Input
            key="Number-of-participants"
            type="number"
            label="Number of participants"
            value={participantsCount}
            placeholder="Enter number of participants"
            isRequired={true}
            onChange={e =>
              this.setStateHandler("participantsCount", e.target.value)
            }
            errorMessage={participantsCountErrorMessage}
          />
          <Input
            key="Number-of-pool"
            type="number"
            label="Number of pool"
            value={poolsCount}
            placeholder="Enter number of pools"
            isRequired={true}
            onChange={e => this.setStateHandler("poolsCount", e.target.value)}
            errorMessage={poolsCountErrorMessage}
          />
          <Input
            key="Number-of-qualifiers-from-each-pool"
            type="number"
            label="Number of qualifiers from each pool"
            value={qualifiersCountPerPool}
            placeholder="Enter number of qualifiers from each pool"
            isRequired={true}
            onChange={e =>
              this.setStateHandler("qualifiersCountPerPool", e.target.value)
            }
            errorMessage={qualifiersCountPerPoolErrorMessage}
          />
        </div>
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    );
  }
}

export default withRouter(ConfigureForm);
