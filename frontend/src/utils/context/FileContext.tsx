import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

interface FileContextType {
  fileContent: any[] | null;
  fileType: string;
  setFileContent: (content: any[], type: string) => Promise<void>;
}

const FileContext = createContext<FileContextType>({
  fileContent: null,
  fileType: '',
  setFileContent: () => Promise.resolve(),
});

export const useFileContext = () => useContext(FileContext);

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider = ({ children }: FileProviderProps) => {
  const [fileContent, setFileContentState] = useState<any[]>(null);
  const [fileType, setFileType] = useState<string>('');

  const setFileContent = async (content: any[], type: string) => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      setFileContentState(content);
      setFileType(type);
    } catch (error) {
      console.error('Error setting file content:', error);
    }
  };

  const contextValue = useMemo(
    () => ({
      fileContent,
      fileType,
      setFileContent,
    }),
    [fileContent, fileType],
  );

  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  );
};
