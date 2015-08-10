# Strap Security Policy Overview

We take great pride in the security of customer data and our platform – _it is our top priority_.  The Strap Security Policy Overview is meant to be a customer-facing summary of our security practices.

[Downloadable Verison](https://storage.googleapis.com/strap-docs/strap-security-policy-overview.pdf)

## 1. Purpose

This policy provides overview of information security practices throughout Strap. It applies to:

- all those with access to Strap information systems, including staff, visitors and contractors
- any systems attached to Strap computer networks and any systems supplied by Strap
- all information (data) processed by Strap pursuant to its operational activities, 
- all external parties that provide services to Strap in respect of information processing facilities and business activities, and
- principal information assets including the physical locations from which Strap operates.

## 2. Aims and Commitments

2.1 Strap recognizes the role of information security in ensuring that users have access to the information they require in order to carry out their work.  Computer and information systems underpin all Strap activities, and are essential to its research, operations, and platform functionality.

2.2 Any reduction in the confidentiality, integrity, or availability of information could prevent Strap from functioning effectively and efficiently. To mitigate these risks, information security is an integral part of information management.

2.3 Strap is committed to protecting the security of our information systems in order to ensure that:

- the integrity of information is maintained, so that it is accurate, up to date, and 'fit for purpose';
- information is always available to those who need it and there is no disruption to the business of Strap;
- confidentiality is not breached, so that information is accessed only by those authorized to do so;
- Strap meets its legal requirements and customer agreements; and
- the reputation of Strap and our customers are safeguarded.

2.4 In order to meet these aims, Strap is committed to implementing security controls that conform to best practice, as set out in the _ISO/IEC 27002:2023 Information Security Techniques_.  Our cloud service providers ( [Google Cloud](https://cloud.google.com/security/compliance) and [Amazon Web Services](https://aws.amazon.com/compliance/)) adhere to best in practice security policies, including: SSAE16 / ISAE 3402 Type II, ISO 27001, PCI DSS v3.0, and SOC2, SSAE 16 & ISAE 3402

2.5 Information security risk assessments are performed for all information systems on a regular basis in order to identify key information risks and determine the controls required to keep those risks within acceptable limits.

2.6 Strap is committed to providing sufficient education and training to users to ensure they understand the importance of information security and, in particular, exercise appropriate care when handling confidential information.

2.7 Specialist advice on information security shall be made available throughout Strap and to our customers, as needed.

2.8 An information security advisory group, comprising representatives from all relevant parts of Strap, advise on best practice and coordinate the implementation of information security controls.

2.9 Strap maintains appropriate contacts with other organizations, law enforcement authorities, regulatory bodies, and network and telecommunications operators in respect of its information security policy.

2.10 Breaches of information security are recorded and reported to appropriate bodies in Strap, who will take action and inform the relevant authorities and customers.

2.11 Strap will maintain communicate with customers effected by data breaches and provide details as resolutions are implemented.

## 3. Responsibilities

**Strap Security Team**

3.1 Strap Security Team (SST)is ultimate responsibility for information security within Strap. More specifically, it is responsible for ensuring that Strap complies with relevant external requirements, including legislation.SST is responsible for:

- ensuring that users are aware of this policy;
- seeking adequate resources for its implementation;
- monitoring compliance;
- conducting regular reviews of the policy, having regard to any relevant changes in legislation, organizational policies and contractual obligations; and
- ensuring there is clear direction and visible management support for security initiatives.

**VP of Engineering**

3.2 Given Strap's structure, VP of Engineering is responsible for information security within Strap. The VP of Engineering must ensure that the organization has in place an information security policy to meet its customer needs, consistent with the requirements of any customer service agreements.

**Users and External Parties**

3.3 Users of Strap information will be made aware of their own individual responsibilities for complying with Strap policies on information security.

3.4 Our customers are responsible for generating GUID/UUID that do not contain Personal Identifiable Information during the process of connecting users.  It is critical that Personal Identifiable Information is not used in the GUID/UUID to limit the possibility of data being linked with any specific person outside customer owned information.

3.5 Agreements with third parties involving accessing, processing, communicating, or managing Strap's information, or information systems, cover all relevant security requirements, and be covered in contractual arrangements.

## 4. Risk Assessment and the Classification of Information

**Risk assessment of information held**

4.1 The degree of security control required depends on the sensitivity or criticality of the information. Strap conducts risk assessments in order to identify and classify the nature of the information held and the adverse consequences of security breaches and the likelihood of those consequences occurring.

4.2 The risk assessment will identify the information assets; define the ownership of those assets; and classify them, according to their sensitivity and/or criticality to Strap. In assessing risk, departments should consider the value of the asset, the threats to that asset and its vulnerability.

4.3 Information security risk assessments are repeated periodically and carried out as required during the operational delivery and maintenance of Strap's infrastructure, systems and processes.

**Personal Data**

4.4 Strap requires that appropriate technical and organizational measures are taken against unauthorized or unlawful processing of personal data and against accidental loss or destruction of, or damage to, personal data.

## 5. Protection of Information Systems and Assets

5.1 Strap utilizes the risk assessment results to assign information security policy, setting out appropriate controls and procedures across system components.

5.2. Confidential information contained in the system will be handled in accordance with the requirements set out in section 6 below.

## 6. Protection of Confidential Information

Identifying confidential information is a matter for assessment in each individual case. Broadly, however, information will be confidential if it is of limited public availability; is confidential in its very nature; has been provided on the understanding that it is confidential; and/or its loss or unauthorized disclosure could have one or more of the following consequences:

 - accessibility exposure<br>e.g. password, certificates, authentication tokens;

 - reputational damage<br>e.g. adverse publicity, complaints about breaches of privacy; and/or

 - an adverse effect on the safety or well-being of members of Strap or those associated with it<br>e.g. embarrassment or damage to Strap, customers, or users

### 6.1 Storage

6.1.1 Confidential information is kept secure, using, where practicable, dedicated cloud storage rather than local hard disks.

6.1.2 File or disk encryption is used as an additional layer of defense.

### 6.2 Access

6.2.1 Confidential information is stored with specific safeguards to ensure that only authorized persons can access it.

6.2.2 All users must be authenticated. Authentication leverages best in class practices.  Users must follow good security practices in the selection and use of passwords.

6.2.3 To allow for investigations, access records are kept for a minimum of six months, or for longer, where considered appropriate.

6.2.4 Users with access to confidential information are security vetted, as appropriate, in accordance with existing policies.

6.2.5 Physical access to systems is highly limited as servers and storage is located in Tier 4 locations provided by our cloud service providers.

### 6.3 Remote access

6.3.1 Remote access is controlled via a well-defined access control policy and tight access controls provided to allow the minimum access necessary.

6.3.2 All remote access is controlled by secure access control protocols using appropriate levels of encryption and authentication.

6.3.3 All cloud services are established on Strap-assign private networks that lock access and entry based on tight protocol settings.

6.3.4 All database and storage locations are located within Strap-assigned private networks without public access available.  All connections to these databases and storage locations can only be executed from within the Strap-assigned private networks.

6.3.5 All network access within the Strap platform is monitored and logged by the cloud service providers.

### 6.4 Copying

The number of copies made of confidential information, whether on portable devices or media, will be the minimum required, and, where necessary, a record kept of their distribution. When no longer needed, the copy is deleted.

### 6.5 Disposal

Policies and procedures are in place for the secure disposal/destruction of confidential information, equipment, and devices.

### 6.6 Exchange of Information and use of Email

6.6.1 Email is appropriately protected from unauthorized use and access by utilizing industry standards for 2-factor authentication.

6.6.2 Email is only used to send confidential information where the recipient is trusted, the information owner has given their permission, and appropriate safeguards have been taken e.g. encryption.

### 6.7 Cryptographic controls

6.7.1 Strap provides guidance and support on the use of cryptographic techniques and to ensure that only authorized personnel may gain access to confidential information.

6.7.2 Strap guidance on cryptographic policy and key management is followed to ensure that data is appropriately secured and that all legal and regulatory requirements have been considered.

### 6.8 System planning and acceptance

A risk assessment is carried out as part of the business case for any new system component that may be used to store confidential information. Risk assessments are repeated periodically on any existing systems.

### 6.9 Backup

Strap ensures that appropriate backup and system recovery procedures are in place. Backup copies are taken every 6 hours for database assets and all storage locations utilize redundancy protocols to increase resilience and reliability.

### 6.10 Enforcement

6.10.1 Strap has defined written policy in place for the handling of confidential information, and a copy of the procedures is be provided to every user so that they are aware of their responsibilities.

6.10.2 Failure by Strap team members to comply with the policy may result in disciplinary action.

6.10.3 Any loss or unauthorized disclosure must be promptly reported to the owner of the information.

## 7. Compliance

7.1 Strap has established this policy to promote information security and compliance with relevant legislation. Strap regards any breach of information security requirements as a serious matter, which may result in disciplinary action.

7.2 Compliance with this policy will be incorporated as part of any contract with a third party that may involve access to network or computer systems or data.

## 8. Contacts for Further Information

| **Name** | **Email** |
| --- | --- | --- |
| Support | [support@straphq.com](mailto:support@straphq.com) |

