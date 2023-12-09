import PropTypes from 'prop-types';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Content from '../../../components/layout/Content';
import Button from '../../../components/shared/Button';
import Photo from '../../../components/shared/Photo';
import Textarea from '../../../components/shared/Textarea';

import './NewAdvertPage.css';
import { createAdvert } from '../services';
import { useNavigate } from 'react-router';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 140;

const fibonacci = n => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const HeavyComponent = ({ value }) => {
  const result = fibonacci(value);
  return (
    <div>
      <code>
        Fibonacci({value}) = {result}
      </code>
    </div>
  );
};

HeavyComponent.propTypes = {
  value: PropTypes.number.isRequired,
};

// const MemoHeavyComponent = memo(HeavyComponent, (p, n) => {
//   console.log('props', p, n);
//   return p.value === n.value;
// });

// const MemoHeavyComponent = memo(HeavyComponent);
const MemoHeavyComponent = HeavyComponent;

function NewAdvertPageForm({ isFetching, onSubmit }) {
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);

  const handleChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(content);
  };

  const characters = `${content.length} / ${MAX_CHARACTERS}`;
  const buttonDisabled = content.length <= MIN_CHARACTERS || isFetching;

  useEffect(() => {
    console.log('textarea', textareaRef);
    textareaRef.current.focus();
  });

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        className="newTweetPage-textarea"
        placeholder="Hey! What's up!"
        value={content}
        onChange={handleChange}
        maxLength={MAX_CHARACTERS}
        ref={textareaRef}
      />
      <div className="newTweetPage-footer">
        <span className="newTweetPage-characters">{characters}</span>
        <Button
          type="submit"
          className="newTweetPage-submit"
          $variant="primary"
          disabled={buttonDisabled}
        >
          Let's go!
        </Button>
      </div>
    </form>
  );
}

function NewAdvertPage() {
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const counterRef = useRef(0);
  const formRef = useRef(null);
  const divRef = useRef(null);

  // { current: null }

  useEffect(() => {
    counterRef.current++;
  });

  useEffect(() => {
    console.log(formRef);
  }, []);

  const handleSubmit = async content => {
    try {
      setIsFetching(true);
      const advert = await createAdvert({ content });
      navigate(`../${advert.id}`, { relative: 'path' });
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      } else {
        setIsFetching(false);
        // Show errorMemoHeavyComponent
      }
    }
  };

  const callback = useCallback(() => {}, []);
  const object = useMemo(() => ({}), []);

  return (
    <Content title="What are you thinking?">
      <div
        className="newTweetPage"
        ref={element => {
          console.log(element);
          divRef.current = element;
        }}
      >
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <NewAdvertPageForm isFetching={isFetching} onSubmit={handleSubmit} />
        </div>
      </div>
      <HeavyComponent
        value={37}
        callback={callback}
        object={object}
        array={[]}
      />
    </Content>
  );
}

export default NewAdvertPage;
