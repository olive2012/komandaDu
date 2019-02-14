package it.akademija.documents.service;

import it.akademija.documents.repository.DocumentTypeEntity;
import it.akademija.documents.repository.DocumentTypeRepository;
import it.akademija.users.repository.UserEntity;
import it.akademija.users.repository.UserGroupEntity;
import it.akademija.users.repository.UserRepository;
import it.akademija.users.service.UserGroupServiceObject;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DocumentTypeService {

    @Autowired
    private DocumentTypeRepository documentTypeRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Set<DocumentTypeServiceObject> getAllDocumentTypes () {
        return documentTypeRepository.findAll().stream().map(
                (docType) ->
                new DocumentTypeServiceObject(docType.getTitle()))
                .collect(Collectors.toSet());

    }

    @Transactional
    public Set<DocumentTypeServiceObject> getAllAllowedDocumentTypes(String userIdentifier) {
        UserEntity user = userRepository.findUserByUserIdentifier(userIdentifier);

        if (user == null){
            return null;
        }

        Set<DocumentTypeServiceObject> allowedTypes = new HashSet<>();

        for (UserGroupEntity group : user.getUserGroups())
        {
            allowedTypes.addAll(group.getAvailableDocumentTypesToUpload()
                    .stream()
                    .map(typeEntity ->
                            new DocumentTypeServiceObject(typeEntity.getTitle())
                    )
                    .collect(Collectors.toSet()));
        }

        return allowedTypes;
    }

    @Transactional
    public void createNewDocumentType(String title) {
        DocumentTypeEntity newDocumentTypeEntity = new DocumentTypeEntity(title);
        documentTypeRepository.save(newDocumentTypeEntity);
    }

    @Transactional
    public void updateDocumentType(String currentTitle, String wantedTitle) {
        DocumentTypeEntity documentType = documentTypeRepository.findDocumentTypeByTitle(currentTitle);
        if (wantedTitle != null && !wantedTitle.isEmpty()) {
            documentType.setTitle(wantedTitle);
            documentTypeRepository.save(documentType);
        }

    }

    @Transactional
    public void deleteDocumentType(String title) {
        documentTypeRepository.deleteDocumentTypeByTitle(title);


    }
}
