/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import styled from 'styled-components';
import ClientId from '../clientId';

const InfoDivWrapper = styled.div`
  margin-top: 2em;
  max-width: 40em;
  margin-left: auto;
  margin-right: auto;
`;

const UserImg = styled.img`
  height: 125px;
  width: 125px;
  margin-top: 0.4em;
`;

const BroadCasterInfo = ({ user, usrId, url }) => {
  const [userInfoData, setUserInfoData] = useState(null);
  const [updateUrl, setUpdateUrl] = useState(null);
  async function Api() {
    try {
      const userReq = `https://api.twitch.tv/helix/users?id=${usrId}`;
      const returnData = await axios.get(userReq, { headers: { 'Client-ID': ClientId } });
      if (returnData.data.data.length === 0) {
        throw error;
      }
      setUserInfoData(returnData.data.data.map(item => ({
        type: item.broadcaster_type,
        descript: item.description,
        profImg: item.profile_image_url,
        viewNumbers: item.view_count,
      })),
      );
    } catch (error) {
      setUserInfoData('none');
      console.log(error);
    }
  }
  useEffect(() => {
    if (userInfoData === null) {
      Api();
      return;
    }
    if (url !== updateUrl) {
      setUpdateUrl(url);
      Api();
    }
  }, [url, updateUrl, userInfoData, Api]);
  const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  return (
    <InfoDivWrapper>
      <h4 data-testid="aboutBroadcaster">About {user}:</h4>
      {userInfoData === null || userInfoData === 'none' ? 'Unable to display user information.'
        : <div data-testid="broadcasterInfoSec">
          <span>
            {'Type:'} {userInfoData[0].type}
          </span>
          <br />
          <br />
          <span>
            {'Description:'} {userInfoData[0].descript}
          </span>
          <br />
          <br />
          <span>
            {'Total Channel Views:'} {formatNumber(userInfoData[0].viewNumbers)}
          </span>
          <br />
          <br />
          <span>
            <UserImg src={userInfoData[0].profImg} />
          </span>
        </div>
      }
    </InfoDivWrapper>
  );
};

export default BroadCasterInfo;
